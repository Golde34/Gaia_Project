# Check tailscale connection 
tailscale status

# Start tailscale connection
sudo tailscale serve --bg --set-path=/ 5173

# Remove tailscale connection
    sudo tailscale serve --https=443 off