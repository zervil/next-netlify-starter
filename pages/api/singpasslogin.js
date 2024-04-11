import { NextResponse } from "next/server";
import axios from 'axios';

export default async function GET(){
  const scope = 'openid';
  const responseType = 'code';
  const redirect_uri= 'https://chuanyong.netlify.app';
  const nonce = '54481a5c-ce01-4247-888c-9a2f1c02394a';
  const state = '5eCKEUXKNEKDx';
  const client_id = 'zPjmFOm3bDPiGFIHezfWlY4DOFym5aMc';
  const singpassURL = `https://stg-id.singpass.gov.sg/auth?scope=${scope}&response_type=${responseType}&redirect_uri=${redirect_uri}&nonce=${nonce}&client_id=${client_id}&state=${state}`;

  axios.get(singpassURL).then(response => {
    console.log(response.data);
    return new NextResponse({response});
  })
}