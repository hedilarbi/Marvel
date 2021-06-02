sudo docker rm -f $(sudo docker ps -a -q)
sudo docker build /home/codedeploy/test -t marvel
sudo docker run -it -p 80:80 -d marvel
