sudo systemctl restart docker
sudo docker build /home/codedeploy/test -t marvel
sudo docker run -it -p 8010:80 -d marvel
