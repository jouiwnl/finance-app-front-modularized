import axios from 'axios';

export const http = axios.create({
    //baseURL: 'http://localhost:8080/'
    baseURL: 'http://ec2-54-94-165-247.sa-east-1.compute.amazonaws.com:8080/'
});