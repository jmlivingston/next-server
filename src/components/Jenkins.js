import React, { useCallback, useEffect, useState } from 'react';
import { NEXT_PUBLIC_JENKINS_URL, NEXT_PUBLIC_JENKINS_USER_TOKEN } from '../config/CONSTANTS';

function Jenkins() {
  const Authorization = `Basic ${NEXT_PUBLIC_JENKINS_USER_TOKEN}`;
  const [data, setData] = useState();

  const getListOfJenkinsJobs = useCallback(async () => {
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
  }, [Authorization]);

  useEffect(() => {
    (async () => {
      getListOfJenkinsJobs();
    })();
  }, [getListOfJenkinsJobs]);

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
