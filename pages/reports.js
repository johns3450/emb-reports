import { getSession, useSession } from "next-auth/react";

export default function Reports() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Access Denied</p>;

  return (
    <div>
      <h1>Reports Dashboard</h1>
      {/* Embed your Data Studio reports or other content here */}
      <iframe src="https://lookerstudio.google.com/embed/reporting/0dc53cbc-caa0-4e14-b3a4-25d05c94dd1c/page/c8RBF" width="100%" height="600"></iframe>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
