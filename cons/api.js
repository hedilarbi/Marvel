import getConfig from 'next/config';
import md5 from 'md5';

const ts = Date.now();
const priva = '3e8b7f2146a4263fb01626ba2814d191dd0c5cfe' ;
const publ = '9071b1b048d5d3675ea7b07d56dba068' ; 
const hash = md5(ts + priva + publ) 

const APIS = (query) => 'https://gateway.marvel.com:443/v1/public/characters?ts='+ts+'&apikey='+publ+'&hash='+hash+'&nameStartsWith='+ query;


export default APIS;
