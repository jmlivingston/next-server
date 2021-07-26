import React, { useEffect, useState } from 'react';
import { NEXT_PUBLIC_JENKINS_USER_TOKEN, NEXT_PUBLIC_JENKINS_URL } from '../config/CONSTANTS';

function Jenkins() {
  console.log(NEXT_PUBLIC_JENKINS_URL);
  const Authorization = `Basic ${NEXT_PUBLIC_JENKINS_USER_TOKEN}`;
  const [data, setData] = useState();

  async function getListOfJenkinsJobs() {
    const response = await fetch(
      `${NEXT_PUBLIC_JENKINS_URL}/json?token=${NEXT_PUBLIC_JENKINS_USER_TOKEN}`, //?tree=jobs[MVJ]`,
      {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
          Authorization,
          'Content-Type': 'application/json',
        },
      }
    );
    setData(response);
  }

  useEffect(() => {
    (async () => {
      getListOfJenkinsJobs();
    })();
  }, []);

  return (
    <div>
      <h1>Jenkins</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Jenkins;
