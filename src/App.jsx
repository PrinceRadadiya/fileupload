import React, { useState } from 'react'

const App = () => {

  const [file, setfile] = useState()

  function handlefile(event) {
    setfile(event.target.files[0])
  }

  function handalesubmite() {
    const formData = new FormData()
    formData.append('file', file)
    fetch(
      'url',
      {
        method: 'POST',
        body: formData
      }
    ).then((res) => res.json()).then(
      (result) => {
        console.log('success', result)
      }
    ).catch(error =>{
      console.log("Error",error);
    })
  }

  return (
    <div>
      <form onSubmit={handalesubmite}>
        <input type="file" name="file" onChange={handlefile} />
        <button>upload</button>
      </form>
    </div>
  )
}

export default App
