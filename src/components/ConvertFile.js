import Image from 'next/image';
import React, { Fragment, useState } from 'react';
import { ENV_KEY } from '../config/CONSTANTS';

function ConvertFile() {
  const [updates, setUpdates] = useState([]);
  const [image, setImage] = useState();

  function addUpdate(update) {
    setUpdates((oldUpdates) => [...oldUpdates, update]);
  }

  function getBase64String({ contentType, data }) {
    const str = data.reduce((a, b) => {
      return a + String.fromCharCode(b);
    }, '');
    return `data:${contentType};base64,` + btoa(str).replace(/.{76}(?=.)/g, '$&\n');
  }

  async function getS3SignedUrl() {
    const s3SignedUrlResponse = await fetch('/api/aws-s3-signed-url', {
      method: 'POST',
      body: JSON.stringify({
        contentType: 'image/heic',
        extension: 'heic',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (s3SignedUrlResponse.ok) {
      const s3SignedUrlJson = await s3SignedUrlResponse.json();
      return {
        url: s3SignedUrlJson.data.url,
        fileName: s3SignedUrlJson.data.fileName,
      };
    } else {
      throw new Error('Error getting S3 Signed URL');
    }
  }

  async function uploadFile({ file, url }) {
    const s3UploadResponse = await fetch(url, {
      method: 'PUT',
      body: file,
    });
    return s3UploadResponse.ok;
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
    });
    const convertFileJson = await convertFileResponse.json();
    const dataUri = getBase64String({
      contentType: 'image/jpeg',
      data: convertFileJson.data.Body.data,
    });
    return dataUri;
  }

  async function onChange(event) {
    setUpdates([]);
    setImage();
    try {
      addUpdate('1 - Getting S3 Predefined URL.');
      // const { fileName, url } = await getS3SignedUrl()
      const fileName = '183db63e-ca3e-4715-a51c-1676b030a49c.heic';
      const url =
        'https://mvj-api-dev4-mvj-upload-convert-photo.s3.amazonaws.com/183db63e-ca3e-4715-a51c-1676b030a49c.heic?Content-Type=image%2Fheic&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATI7VU2MY7KA4YTB4%2F20210629%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210629T143740Z&X-Amz-Expires=6000&X-Amz-Signature=c5c88eddc57d2e60a8b5cfb207d8c0e0c65fe9ee0a4f8df6b5e60d897010d5c5&X-Amz-SignedHeaders=host';

      addUpdate({ fileName, url });
      addUpdate('2 - Uploading file to S3 using Predefined URL.');
      const uploadFileResult = await uploadFile({
        file: event.target.files[0],
        url,
      });
      addUpdate({ uploadFileResult });
      if (uploadFileResult) {
        addUpdate('3 - Calling to convert and get file.');
        const dataUri = await convertFile({
          fileName: fileName.replace('heic', 'jpg'),
        });
        setImage(dataUri);
        addUpdate('Complete');
      } else {
        throw new Error('Error uploading file to S3.');
      }
    } catch (error) {
      addUpdate(`ERROR: ${JSON.stringify(error.message)}`);
    }
  }

  return (
    <>
      <h1>Environment: {ENV_KEY}</h1>
      <figure>
        <blockquote className="blockquote">Note: Change in Utility/Constants.js</blockquote>
      </figure>
      <input type="file" accept="image/jpeg,image/heic" onChange={onChange} className="form-control-file" />
      {updates.length > 0 && (
        <>
          <hr />
          {updates.map((update, index) => (
            <Fragment key={index}>
              {typeof update === 'string' ? (
                <div>{update}</div>
              ) : (
                <pre>
                  <code>{JSON.stringify(update, null, 2)}</code>
                </pre>
              )}
            </Fragment>
          ))}
        </>
      )}
      {image && (
        <>
          <hr />
          <Image src={image} alt="Test image" width={291} height={348} />
        </>
      )}
    </>
  );
}

export default ConvertFile;
