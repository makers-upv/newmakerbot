# NewMakerBot
Telegram bot to welcome new makers at the MakersUPV oficial Telegram group. The bot is program in NodeJS using 



# Developing new features for the bot





# Deploy instructions

1. Create a user to run the service with  and clone the repo to the production environment, this can be either a VPS running NodeJS or a local remote server. Please take into account that the server must have Internet connection in order to communicate with Telegram bot API.

```bash
sudo useradd newmakerbot
sudo passwd newmakerbot
cd /home/newmakerbot
git clone https://github.com/makers-upv/newmakerbot.git
```

2. Run *npm install* to install all the dependencies on the running environment (npm & NodeJS have to be installed):

   ```bash
   npm install
   ```

   That will download and install all the dependencies and will create the *node_modules* folder.

3. Create a .env file where Telegram API TOKEN will be store. It could be also use to add new future updates and features that needs environment configurations as tokens, passwords or others. There is a sample.env as a template. Run the following

```bash
cd newmakerbot
cp sample.env .env
vi .env
```

4. Edit .env file with the Bothfather Telegram Token:

```bash
TELEGRAM_BOT_TOKEN=BotFather_token_goes_here

```

5. Change owner privilege and make newmakerbot.js executable:

```bash
sudo chown newmakerbot:newmakerbot /home/newmakerbot/newmakerbot/*
sudo chmod -x /home/newmakerbot/newmakerbot/newmakerbot.js
```

6. Create a systemd file to run it as a service:

```bash
vi /lib/systemd/system/newmakerbot.servicev
```

Copy the following and save the file (with :wq):

```bash
[Unit]
Description=Telegram bot
Documentation=https://github.com/makers-upv/newmakerbot
After=network.target

[Service]
#Environment=NODE_PORT=3001
Type=simple
User=newmakerbot
WorkingDirectory=/home/newmakerbot/newmakerbot
ExecStart=/usr/bin/node -r dotenv/config /home/newmakerbot/newmakerbot/newmakerbot.js
Restart=on-failure
StartLimitInterval=300

[Install]
WantedBy=multi-user.target

```

7. Update systemd and run the service:

```bash
sudo systemctl daemon-reload
sudo systemctl start newmakerbot
```

8. Check that the status is *active (running)*:

```bash
● newmakerbot.service - Telegram bot
   Loaded: loaded (/lib/systemd/system/newmakerbot.service; disabled; vendor pre
   Active: active (running) since Sat 2018-10-27 12:18:19 CEST; 4 days ago
     Docs: https://github.com/makers-upv/newmakerbot
 Main PID: 11221 (node)
    Tasks: 10
   Memory: 19.7M
      CPU: 16.963s
   CGroup: /system.slice/newmakerbot.service
           └─11221 /usr/bin/node -r dotenv/config /home/newmakerbot/newmakerbot/
```

