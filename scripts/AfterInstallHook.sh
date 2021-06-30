sudo systemctl restart docker
sudo docker build /home/codedeploy/test -t marvel
sudo docker run -it -p 80:8010 -d marvel
