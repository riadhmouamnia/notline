function SessionPage({ sessionCode }: { sessionCode: string }) {
  return <div>Session {sessionCode} is live NOW</div>;
}

export default SessionPage;

export async function getServerSideProps({
  params,
}: {
  params: { sessionCode: string };
}) {
  const { sessionCode } = params;
  return {
    props: {
      sessionCode,
    },
  };
}
