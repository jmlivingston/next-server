import React, { useState } from 'react'
import { ENV_KEY } from '../utility/CONSTANTS'

function ConvertFile() {
  const [envKey, setEnvKey] = useState(ENV_KEY)
  const [updates, setUpdates] = useState([])
  const [image, setImage] = useState()

  function addUpdate(update) {
    setUpdates((oldUpdates) => [...oldUpdates, update])
  }

  function getBase64String({ contentType, data }) {
    const str = data.reduce((a, b) => {
      return a + String.fromCharCode(b)
    }, '')
    return (
      `data:${contentType};base64,` + btoa(str).replace(/.{76}(?=.)/g, '$&\n')
    )
  }

  async function getS3AssignedUrl() {
    const s3SignedUrlResponse = await fetch('/api/aws-s3-signed-url', {
      method: 'POST',
      body: JSON.stringify({
        contentType: 'image/heic',
        extension: 'heic',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const {
      data: { url, fileName },
    } = await s3SignedUrlResponse.json()
    return { url, fileName }
  }

  async function uploadFile({ file, url }) {
    const s3UploadResponse = await fetch(url, {
      method: 'PUT',
      body: file,
    })
    return s3UploadResponse.ok
  }

  async function convertFile({ fileName }) {
    const convertFileResponse = await fetch('/api/convert-file', {
      method: 'POST',
      body: JSON.stringify({
        fileName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const convertFileJson = await convertFileResponse.json()
    const dataUri = getBase64String({
      contentType: 'image/jpeg',
      data: convertFileJson.data.Body.data,
    })
    return dataUri
  }

  async function onChange(event) {
    try {
      addUpdate('1 - Get S3 Predefined URL')
      const { fileName, url } = await getS3AssignedUrl()
      console.log({ fileName, url })
      addUpdate('2 - Upload file to S3 using Predefined URL')
      const uploadFileResult = await uploadFile({
        file: event.target.files[0],
        url,
      })
      if (uploadFileResult) {
        addUpdate('3 - Call to convert and get file')
        const dataUri = await convertFile({
          fileName: fileName.replace('heic', 'jpg'),
        })
        setImage(dataUri)
        addUpdate('Complete')
      } else {
        throw new Error('Error uploading file to S3.')
      }
    } catch (error) {
      addUpdate(`ERROR: ${JSON.stringify(error.message)}`)
    }
  }

  return (
    <>
      <h1>Environment: {envKey}</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setUpdates([])
          setEnvKey(envKey === 'A' ? 'B' : 'A')
        }}>
        Toggle Environment
      </button>
      <br />
      <input
        type="file"
        accept="image/jpeg,image/heic"
        onChange={onChange}
        className="form-control-file"
      />
      {updates.length > 0 && (
        <>
          <hr />
          <ul>
            {updates.map((update, index) => (
              <li key={index}>
                <pre>
                  <code>
                    {typeof update === 'string'
                      ? update
                      : JSON.stringify(update)}
                  </code>
                </pre>
              </li>
            ))}
          </ul>
        </>
      )}
      {image && (
        <>
          <hr />
          <img src={image} />
        </>
      )}
    </>
  )
}

export default ConvertFile
