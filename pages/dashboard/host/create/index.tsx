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
import { useState } from "react";

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

function CreateSessionPage() {
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

  const buttonColorMap: { [key: string]: string } = {
    Question: "bg-red-500 hover:bg-red-500/90",
    Aha: "bg-yellow-500 hover:bg-yellow-500/90",
    "I'm lost": "bg-purple-500 hover:bg-purple-500/90",
    Reference: "bg-blue-500 hover:bg-blue-500/90",
    Comment: "bg-gray-500 hover:bg-gray-500/90",
  };

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = {
      ...values,
      buttons: selectedButtons === "fav" ? favoriteButtons : allButtons,
    };
    console.log(formData);
  }

  return (
    <div className="my-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <Button variant="outline" className="w-full" type="submit">
            Preview Session
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateSessionPage;
