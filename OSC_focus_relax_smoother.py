import math
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import threading
import numpy as np
from pythonosc import dispatcher
from pythonosc import osc_server

# Network Variables
ip = "########"  # Update this with your MacBook's actual IP
port = 5000

# Muse Variables
hsi = [4, 4, 4, 4]
hsi_string = ""
abs_waves = [-1, -1, -1, -1, -1]
rel_waves = [-1, -1, -1, -1, -1]

# Data Storage for Analysis
plot_val_count = 200
plot_data = [[0], [0], [0], [0], [0]]
alpha_beta_ratios = []
smoothed_ratios = []  # Stores smoothed values

# Smoothing Parameters
window_size = 10  # Moving average window
ema_alpha = 0.2  # Weight for exponential moving average (0.2 means newer values have 20% weight)

def moving_average(data, window=10):
    """Computes a moving average over a fixed window size."""
    if len(data) < window:
        return np.mean(data)  # If not enough values, take mean of what is available
    return np.mean(data[-window:])

def exponential_moving_average(data, alpha=0.2):
    """Computes the Exponential Moving Average (EMA)."""
    if len(data) < 2:
        return data[-1]  # If only one value, return it as is
    return alpha * data[-1] + (1 - alpha) * smoothed_ratios[-1] if smoothed_ratios else data[-1]

def classify_focus_vs_relaxation():
    """Classifies mental state based on the smoothed alpha/beta ratio."""
    if len(smoothed_ratios) < 10:
        return  # Not enough data

    latest_ratio = smoothed_ratios[-1]

    # Rule-based classification with smoothed values
    if latest_ratio < 1.4:
        state = "FOCUSING"
    elif latest_ratio > 2:
        state = "RELAXING"
    else:
        state = "NEUTRAL"

    print(f"Smoothed Alpha/Beta Ratio: {latest_ratio:.2f} | State: {state}")

def hsi_handler(address: str, *args):
    """Handles the Muse headband fit quality."""
    global hsi, hsi_string
    hsi = args
    hsi_string_new = "Muse Fit Good" if sum(args) == 4 else "Muse Fit Bad"
    if hsi_string != hsi_string_new:
        hsi_string = hsi_string_new
        print(hsi_string)

def abs_handler(address: str, *args):
    """Handles absolute EEG wave data and updates focus/relaxation classification."""
    global hsi, abs_waves, rel_waves
    wave = args[0][0]

    if any(hsi[i] == 1 for i in range(4)):  # At least one good sensor
        if len(args) == 2:
            abs_waves[wave] = args[1]
        if len(args) == 5:
            sum_vals = sum(args[i+1] for i in range(4) if hsi[i] == 1)
            count_vals = sum(hsi[i] == 1 for i in range(4))
            abs_waves[wave] = sum_vals / count_vals if count_vals > 0 else -1

        rel_waves[wave] = math.pow(10, abs_waves[wave]) / sum(math.pow(10, abs_waves[i]) for i in range(5))
        update_plot_vars(wave)

        # Compute Alpha/Beta ratio dynamically and classify
        if wave == 2:  # Alpha wave update triggers classification
            alpha = rel_waves[2]
            beta = rel_waves[3]
            if beta > 0:  # Prevent division by zero
                alpha_beta_ratio = alpha / beta
                alpha_beta_ratios.append(alpha_beta_ratio)
                alpha_beta_ratios[:] = alpha_beta_ratios[-plot_val_count:]  # Keep fixed length

                # # Apply moving average smoothing
                # smoothed_value = moving_average(alpha_beta_ratios, window_size)
                
                # Alternatively, apply EMA (uncomment if you prefer it)
                smoothed_value = exponential_moving_average(alpha_beta_ratios, ema_alpha)

                smoothed_ratios.append(smoothed_value)
                smoothed_ratios[:] = smoothed_ratios[-plot_val_count:]

                classify_focus_vs_relaxation()

# Live plot update
def update_plot_vars(wave):
    """Updates the rolling EEG wave data for visualization."""
    global plot_data, rel_waves, plot_val_count
    plot_data[wave].append(rel_waves[wave])
    plot_data[wave] = plot_data[wave][-plot_val_count:]

def plot_update(i):
    """Updates the live EEG wave plot."""
    global smoothed_ratios, alpha_beta_ratios
    plt.clf()

    if len(alpha_beta_ratios) > 10:
        plt.plot(range(len(alpha_beta_ratios)), alpha_beta_ratios, color='blue', alpha=0.3, label="Raw Alpha/Beta Ratio")
        plt.plot(range(len(smoothed_ratios)), smoothed_ratios, color='red', label="Smoothed Ratio (Moving Avg)")
        plt.axhline(y=1.4, color='purple', linestyle='dashed', label="Focus Threshold")
        plt.axhline(y=2, color='green', linestyle='dashed', label="Relaxation Threshold")

    plt.ylim([0, max(3, max(smoothed_ratios[-100:]) if smoothed_ratios else 1)])
    plt.xlabel("Time (updates)")
    plt.ylabel("Alpha/Beta Ratio")
    plt.title("EEG Alpha/Beta Ratio (Raw vs. Smoothed)")
    plt.legend(loc='upper left')

def init_plot():
    """Starts the Matplotlib plot animation."""
    ani = FuncAnimation(plt.gcf(), plot_update, interval=500)
    plt.tight_layout()
    plt.show()

# Main
if __name__ == "__main__":
    dispatcher = dispatcher.Dispatcher()
    dispatcher.map("/muse/elements/horseshoe", hsi_handler)
    dispatcher.map("/muse/elements/delta_absolute", abs_handler, 0)
    dispatcher.map("/muse/elements/theta_absolute", abs_handler, 1)
    dispatcher.map("/muse/elements/alpha_absolute", abs_handler, 2)
    dispatcher.map("/muse/elements/beta_absolute", abs_handler, 3)
    dispatcher.map("/muse/elements/gamma_absolute", abs_handler, 4)

    server = osc_server.ThreadingOSCUDPServer((ip, port), dispatcher)
    print("Listening on UDP port", port)
    server_thread = threading.Thread(target=server.serve_forever)
    server_thread.daemon = True
    server_thread.start()

    init_plot()
