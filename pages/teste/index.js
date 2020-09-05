import axios from 'axios';

export default function Teste() {

  const teste = async () => {

    const resp = await axios.get('/apis/items');
    console.log(resp);
  }

  return (
    <>
      <div>Teste</div>
      <button onClick={teste}>Clique aqui</button>
    </>
  )
}