from bs4 import BeautifulSoup
import requests

query = raw_input();

url = "https://kat.cr/usearch/" + query + "/";

r = requests.get(url);
data = r.text;

soup = BeautifulSoup(data);

magnet_element = soup.findAll('tr', {'class':'odd'})[0].find_all('td')[0].find_all('div')[0].find_all('a')[-2];

magnet_link = magnet_element.get('href');

print magnet_link;
