import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { buttonColorMap, generateCode, generatePin } from "@/lib/utils";
import { useRouter } from "next/router";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  buttons: z.string({
    required_error: "Please select action button.",
  }),
});

function CreateNewSeassionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const selectedButtons = form.watch("buttons");
  const [favoriteButtons, setFavoriteButtons] = useState<string[]>([]);
  const allButtons = ["Question", "Aha", "I'm lost", "Reference", "Comment"];
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const router = useRouter();

  // Function to handle favorite button click
  const handleFavoriteButtonClick = (button: string) => {
    if (favoriteButtons.includes(button)) {
      // Remove button if already selected
      setFavoriteButtons(
        favoriteButtons.filter((favButton) => favButton !== button)
      );
    } else {
      // Add button if not selected
      setFavoriteButtons([...favoriteButtons, button]);
    }
  };

  // Function to render buttons based on the selection
  const renderButtonsList = () => {
    return (
      <div className="flex flex-col space-y-2">
        {selectedButtons === "noteline" &&
          allButtons.map((button) => (
            <Button
              key={button}
              type="button"
              className={`${buttonColorMap[button]}`}
            >
              {button}
            </Button>
          ))}

        {selectedButtons === "fav" &&
          allButtons.map((button) => (
            <Button
              key={button}
              type="button"
              className={`${
                buttonColorMap[button]
              } flex items-center justify-center ${
                !favoriteButtons.includes(button) && "bg-slate-300"
              }`}
              onClick={() => handleFavoriteButtonClick(button)}
            >
              {button}
            </Button>
          ))}
      </div>
    );
  };

  //   // Function to render the preview content
  const renderPreviewContent = () => {
    const sessionCode = generateCode();
    const pin = generatePin();

    const sessionData = {
      ...form.getValues(),
      id: sessionCode,
      buttons: selectedButtons === "fav" ? favoriteButtons : allButtons,
      sessionCode,
      pin,
    };

    return (
      <>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{sessionData.title}</DialogTitle>
            <DialogDescription>{sessionData.description}</DialogDescription>
            <div className="flex flex-col space-y-2">
              {sessionData.buttons.map((button) => (
                <Button
                  key={button}
                  type="button"
                  className={`${buttonColorMap[button]} w-full `}
                  onClick={() => handleFavoriteButtonClick(button)}
                >
                  {button}
                </Button>
              ))}
            </div>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowPreviewModal(false)}
                className="flex-1 md:max-w-fit"
              >
                Edit
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={() => handleAccept(sessionData)}
              className="flex-1 md:max-w-fit"
            >
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </>
    );
  };

  const handleAccept = (values: SessionData) => {
    // creat firebase session doc and send the values
    // console.log(values);
    router.push(`/dashboard/host/create/${values.sessionCode}`);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formErrors = form.formState.errors;
    if (Object.keys(formErrors).length === 0) {
      setShowPreviewModal(true);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name your session" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Descripe your session..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buttons"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action buttons for this session" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="noteline">
                    Noteline standard buttons
                  </SelectItem>
                  <SelectItem value="fav">My favorite 3 buttons</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* display list of button based on selected value */}
        {renderButtonsList()}

        {/* Modal for preview */}
        <Button type="submit" variant="outline">
          Preview
        </Button>
        <Dialog open={showPreviewModal}>{renderPreviewContent()}</Dialog>
      </form>
    </Form>
  );
}

export default CreateNewSeassionForm;
