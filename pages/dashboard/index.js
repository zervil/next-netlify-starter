import Head from 'next/head'
import Header from '@components/Header'
import axios from 'axios'
import jwt from 'jsonwebtoken'

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
    const params = new URL(location.href).searchParams;
    const codeReturn = params.get('code');
    const stateReturn = params.get('state');
    console.log('code: ', codeReturn);
    console.log('state: ', stateReturn);
    const scope = 'openid';
    const redirect_uri= 'https://chuanyong.netlify.app/dashboard';
    const client_id = 'zPjmFOm3bDPiGFIHezfWlY4DOFym5aMc';
    const grantType = 'authorization_code';
    const clientAssertionType = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';

    const privatekey = `-----BEGIN EC PRIVATE KEY-----
    MHcCAQEEICXoLhGdD6jzX5ePTY9O9YBgv0ZZ6oBWDRsjKaeASXp6oAoGCCqGSM49
    AwEHoUQDQgAELCnuRSU9Vf+bx65i3Vbibj123RQFrIEaXuMuXunzPXGURKge07fy
    FoiMucdGZ2MZGsm37JdlnVGd5yU1h4D4Rg==
    -----END EC PRIVATE KEY-----`
    const header = {
      typ: 'JWT',
      alg: 'ES256'
    };
    const payload = {
      iss: client_id,
      sub: client_id,
      aud: "https://id.singpass.gov.sg",
      jti: uuid(),
      exp: Math.floor(Date.now() / 1000) + 300,
      iat: Date.getTime(),
      code: codeReturn
    };
    
    const token = jwt.sign(payload, privatekey, { header: header, algorithm: "ES256" });
    console.log(token);

    const clientAssertion = token;
    const singpassTokenURL = `https://stg-id.singpass.gov.sg/token`;

    // window.location.href = singpassURL;
    axios.post(singpassTokenURL,{
      scope: scope,
      redirect_uri: redirect_uri,
      client_id: client_id,
      grant_type: grantType,
      code: codeReturn,
      client_assertion_type: clientAssertionType,
      client_assertion: clientAssertion,
    }).then(response => {
      console.log(response.data);
    })
    // const res = await fetch('http://localhost:3000/api/singpasslogin',{
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   scope: scope,
    //   redirect_uri: redirect_uri,
    //   client_id: client_id,
    //   grant_type: grantType,
    //   code: codeReturn,
    //   client_assertion_type: clientAssertionType,
    //   client_assertion: clientAssertion,
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
