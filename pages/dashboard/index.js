import Head from 'next/head'
import Header from '@components/Header'
import axios from 'axios'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Dashboard" />
        <p className="description">
          <button onClick={handleSubmit}>POST</button>
        </p>
      </main>
    </div>
  )
}

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const urlParams = new URLSearchParams(window.location);
    console.log("urlParams: ", urlParams);
    console.log("window location:", window.location);
    const scope = 'openid';
    const responseType = 'code';
    const redirect_uri= 'https://chuanyong.netlify.app';
    const nonce = '54481a5c-ce01-4247-888c-9a2f1c02394a';
    const state = '5eCKEUXKNEKDx';
    const client_id = 'zPjmFOm3bDPiGFIHezfWlY4DOFym5aMc';
    const singpassURL = `https://stg-id.singpass.gov.sg/auth?scope=${scope}&response_type=${responseType}&redirect_uri=${redirect_uri}&nonce=${nonce}&client_id=${client_id}&state=${state}`;

    // window.location.href = singpassURL;
    // axios.get(singpassURL).then(response => {
    //   console.log(response.data);
    // })
    // const res = await fetch('http://localhost:3000/api/singpasslogin',{
    //   method: 'GET',
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // })
    // console.log(res)
    // if(res.ok){
    //   console.log("Yea!")
    // }else{
    //   console.log("Oops! Something is wrong.")
    // }
  } catch (error) {
      console.log(error)
  }
}
