import Head from 'next/head'
import Search from '../components/search/Search.js'

export default function Home() {

  const fetcher = async () => {
    const resp = await fetch('/api/product/list?q=celular');
    const data = await resp.json();
    console.log(data);
  }


  // const fetcherById = async () => {
  //   const resp = await fetch('/api/product/MLA869674847');
  //   const data = await resp.json();
  //   console.log(data);
  // }

  return (
    <div className="container">
      <Head>
        <title>Teste - Mercado Livre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <Search fetcher={fetcher} />
      </section>

      <main>
        <p>Teste</p>
        {/* <button onClick={fetcher}>Clique</button>
        <button onClick={fetcherById}>Clique Bucar por id</button> */}
      </main>

      <style jsx>{`
        section {
          background-color: #FFE600;
          // background-image: url(/Logo_ML.png);
          background-position: 13px;
          background-repeat: no-repeat;
          // padding: 1rem 1rem 1rem 6.6rem;
          margin: 0 auto;
          padding: 10px 0;
          display: flex;
          justify-content: center;
        }

        @media (min-width: 992px) {
            main {
                width: 1042px;
            }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
