import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { RTCManager } from '../../lib/RTCManager';
import { Wrapper } from '../../components/Wrapper';
import { Card } from '../../components/Card';

export default function SessionById() {
  const { query } = useRouter();

  useEffect(() => {
    if (!query.session) return;

    RTCManager.joinRoom(query.session);
  }, [query]);

  return (
    <Wrapper className="h-screen min-h-400 items-start">
      <section className="col-start-2 col-span-6">
        <h1 className="text-4xl font-bold text-gray-800 mt-10 mb-14">
          Meine neue Session
        </h1>
      </section>
      <section className="col-start-2 col-span-3">
        <Card />
      </section>
      <section className="col-start-5 col-span-3">
        <Card />
      </section>
    </Wrapper>
  );
}
