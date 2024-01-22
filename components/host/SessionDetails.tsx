import { auth } from "@/lib/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

function SessionDetails({ sessionCode }: { sessionCode: string }) {
  const [user, loading, error] = useAuthState(auth);
  const userId = user?.uid;

  return (
    <>
      <h1 className="text-lg font-bold">Title</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat numquam
        itaque dolorem velit excepturi eos ad nisi, debitis quos, corporis sunt
        ratione ut dolore cumque obcaecati veritatis molestias dolorum officia?
      </p>
      <p>Your session has been created.</p>
      <div className="my-4">
        <h2 className="text-md font-bold">
          Join with Code:{" "}
          <span className="text-xl font-bold text-green-500">
            {sessionCode}
          </span>
        </h2>
        <h2 className="text-md font-bold">
          Host with PIN:{" "}
          <span className="text-xl font-bold text-orange-500 ">123</span>
        </h2>
      </div>
    </>
  );
}

export default SessionDetails;
