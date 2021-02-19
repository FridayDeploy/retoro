import { useCallback } from 'react';
import { Wrapper } from '../components/Wrapper';
import { Card } from '../components/Card';
import { Formik } from 'formik';
import { Button } from '../components/Button';
import { useRouter } from 'next/router';
import { RTCManager } from '../lib/RTCManager';

const formInitialValues = {
  session_name: ''
};

export default function Index() {
  const { push } = useRouter();
  const handleFormSubmit = useCallback(
    async (values) => {
      const peer = await RTCManager.joinRoom(null, values.session_name);

      push(`/${peer.id}`);
    },
    [push]
  );

  return (
    <Wrapper>
      <section className="h-screen min-h-800 flex items-center col-start-3 col-span-4">
        <Card className="w-full">
          <Formik initialValues={formInitialValues} onSubmit={handleFormSubmit}>
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="session_name" className="text-xl font-bold">
                    Name der Session
                  </label>
                  <input
                    className="block font-medium w-full rounded-lg mt-3 py-4 pl-5 text-gray-800 focus:outline-none bg-gray-50"
                    type="text"
                    id="session_name"
                    name="session_name"
                    placeholder="Retro von Sprint #24"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.session_name}
                  />
                  <Button type="submit" className="w-full mt-4">
                    Session starten!
                  </Button>
                </form>
                {/*<hr className="w-full border-gray-600 my-10 -ml-10 px-10 box-content" />*/}
              </>
            )}
          </Formik>
        </Card>
      </section>
    </Wrapper>
  );
}
