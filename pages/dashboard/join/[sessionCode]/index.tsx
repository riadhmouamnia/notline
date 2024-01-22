import { Button } from "@/components/ui/button";
import { buttonColorMap } from "@/lib/utils";
import { UsersRound } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function JoinSessionPage({ sessionCode }: { sessionCode: string }) {
  const sessionButtons = [
    "Question",
    "Aha",
    "I'm lost",
    "Reference",
    "Comment",
  ];
  const events = [
    {
      type: "Question",
      total: 4,
    },
    {
      type: "Aha!",
      total: 2,
    },
    {
      type: "Comment",
      total: 1,
    },
    {
      type: "Refrence",
      total: 2,
    },
  ];

  return (
    <div className="my-20 flex flex-col items-center gap-4 text-center md:text-left">
      <h1 className="text-xl font-bold">Introduction to CSS flex-box</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
        doloribus quidem veritatis tempore dignissimos. Ad, saepe facilis
        mollitia, ratione id laborum ipsum nisi, blanditiis quasi nobis
        perferendis quisquam impedit porro.
      </p>
      <p className="text-gray-400">Session {sessionCode} is live NOW</p>
      <div className="text-green-500 flex space-x-2 items-center justify-center">
        <UsersRound className="w-4 h-4" />{" "}
        <span className="text-gray-400 text-sm">25 users connected</span>
      </div>
      <div className="w-full my-4 py-4 flex flex-col space-y-2">
        {sessionButtons.map((button) => (
          <Button
            key={button}
            type="button"
            className={`${buttonColorMap[button]}`}
          >
            {button}
          </Button>
        ))}
      </div>
      <Dialog open={false}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Introduction to CSS flex-box</DialogTitle>
            <DialogDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              doloribus quidem veritatis tempore dignissimos. Ad, saepe facilis
              mollitia, ratione id laborum ipsum nisi, blanditiis quasi nobis
              perferendis quisquam impedit porro.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="text-gray-500 flex space-x-2 items-center justify-center">
              <UsersRound className="w-4 h-4" />{" "}
              <span className="text-gray-400 text-sm">
                25 users participated.
              </span>
            </div>
            <Table className="max-h-screen overflow-y-scroll">
              <TableCaption>A list events.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((e, index) => (
                  <TableRow key={index}>
                    <TableCell className="">{e.type}</TableCell>
                    <TableCell className="text-right">{e.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">9</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <DialogClose>
            <Button variant="outline" className="w-full">
              View Details online
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default JoinSessionPage;

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
