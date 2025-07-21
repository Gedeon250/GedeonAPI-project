# Deployment Guide

## Overview
This document provides step-by-step instructions for deploying the Video Call Application to two web servers (Web01 and Web02) and configuring a load balancer (Lb01) to distribute traffic between them.

## Prerequisites
- Access to Web01, Web02, and Lb01 servers
- SSH access to all servers
- Basic knowledge of web server configuration

## Part 1: Deploying to Web Servers

### Step 1: Prepare the Application Files

1. Ensure all files are ready for deployment:
   ```
   GedeonAPI-project/
   ├── index.html
   ├── script.js
   ├── style.css
   ├── assets/
   │   ├── leave.svg
   │   ├── microphone.svg
   │   ├── video.svg
   │   ├── volume-off.svg
   └── └── volume-on.svg
   ```

2. Create a deployment package:
   ```bash
   tar -czf video-call-app.tar.gz index.html script.js style.css assets/
   ```

### Step 2: Deploy to Web01

1. Upload files to Web01:
   ```bash
   scp video-call-app.tar.gz user@web01:/var/www/html/
   ssh user@web01
   cd /var/www/html
   tar -xzf video-call-app.tar.gz
   rm video-call-app.tar.gz
   ```

2. Set proper permissions:
   ```bash
   sudo chown -R www-data:www-data /var/www/html/
   sudo chmod -R 755 /var/www/html/
   ```

3. Configure web server (Apache example):
   ```bash
   sudo systemctl enable apache2
   sudo systemctl start apache2
   ```

### Step 3: Deploy to Web02

1. Repeat the same process for Web02:
   ```bash
   scp video-call-app.tar.gz user@web02:/var/www/html/
   ssh user@web02
   cd /var/www/html
   tar -xzf video-call-app.tar.gz
   rm video-call-app.tar.gz
   sudo chown -R www-data:www-data /var/www/html/
   sudo chmod -R 755 /var/www/html/
   sudo systemctl enable apache2
   sudo systemctl start apache2
   ```

## Part 2: Configure Load Balancer (Lb01)

### Step 1: Install and Configure Nginx (Load Balancer)

1. SSH into Lb01:
   ```bash
   ssh user@lb01
   ```

2. Install Nginx:
   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

3. Create load balancer configuration:
   ```bash
   sudo nano /etc/nginx/sites-available/video-call-lb
   ```

4. Add the following configuration:
   ```nginx
   upstream video_call_servers {
       server web01:80;
       server web02:80;
   }

   server {
       listen 80;
       server_name lb01 your-domain.com;

       location / {
           proxy_pass http://video_call_servers;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           
           # WebRTC specific headers
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_http_version 1.1;
           
           # Timeout settings for WebRTC
           proxy_connect_timeout 10s;
           proxy_send_timeout 300s;
           proxy_read_timeout 300s;
       }
       
       # Health check endpoint
       location /health {
           access_log off;
           return 200 "healthy\n";
           add_header Content-Type text/plain;
       }
   }
   ```

5. Enable the configuration:
   ```bash
   sudo ln -s /etc/nginx/sites-available/video-call-lb /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl enable nginx
   sudo systemctl start nginx
   ```

## Part 3: Testing the Deployment

### Test Individual Servers

1. Test Web01:
   ```bash
   curl -I http://web01/
   ```

2. Test Web02:
   ```bash
   curl -I http://web02/
   ```

### Test Load Balancer

1. Test basic connectivity:
   ```bash
   curl -I http://lb01/
   ```

2. Test load balancing with multiple requests:
   ```bash
   for i in {1..10}; do curl -s http://lb01/ | grep -o '<title>.*</title>'; done
   ```

3. Test health check:
   ```bash
   curl http://lb01/health
   ```

### Test Application Functionality

1. Open browser and navigate to: `http://lb01/`
2. Test the following features:
   - Page loads correctly
   - Enter username and click "Join Stream"
   - Camera and microphone permissions work
   - Video controls (mute/unmute, camera on/off) function
   - Multiple users can join the same channel

## Monitoring and Maintenance

### Check Server Status
```bash
# On Web01/Web02
sudo systemctl status apache2

# On Lb01
sudo systemctl status nginx
```

### View Logs
```bash
# Web servers
sudo tail -f /var/log/apache2/access.log
sudo tail -f /var/log/apache2/error.log

# Load balancer
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Update Deployment
When updating the application:
1. Update both Web01 and Web02 with new files
2. No changes needed on Lb01 unless configuration changes
3. Test functionality after updates

## Troubleshooting

### Common Issues

1. **404 errors**: Check file permissions and paths
2. **502 Bad Gateway**: Check if web servers are running
3. **WebRTC not working**: Ensure HTTPS is configured for production
4. **Load balancer not distributing**: Check upstream server configuration

### Security Considerations

1. Configure firewall rules to restrict direct access to Web01/Web02
2. Only allow traffic through the load balancer
3. Consider implementing SSL/TLS certificates for HTTPS
4. Regularly update server software and security patches

## Performance Optimization

1. Enable gzip compression on web servers
2. Configure caching headers for static assets
3. Monitor server resources and scale as needed
4. Consider implementing session persistence if needed

## Backup and Recovery

1. Regularly backup application files
2. Document configuration changes
3. Test recovery procedures
4. Monitor server health and performance metrics
