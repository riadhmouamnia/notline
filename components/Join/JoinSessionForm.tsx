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
import { useRouter } from "next/router";
import { isConsonant, isVowel } from "@/lib/utils";

const sessionCodeSchema = z.string().refine(
  (value) => {
    const uppercasedValue = value.toUpperCase();
    if (uppercasedValue.length !== 5) return false;

    // Check CVCVC pattern
    return (
      isConsonant(value[0]) &&
      isVowel(value[1]) &&
      isConsonant(value[2]) &&
      isVowel(value[3]) &&
      isConsonant(value[4])
    );
  },
  {
    message:
      "Invalid session code format. Expected format is CVCVC (e.g., 'BODIK').",
  }
);

const formSchema = z.object({
  sessionCode: sessionCodeSchema,
});

function JoinSessionForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sessionCode: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (values.sessionCode === "BODIK") {
      setTimeout(() => {
        router.push(`/dashboard/join/${values.sessionCode}`);
      }, 1000);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uppercaseValue = e.target.value.toUpperCase();
    form.setValue("sessionCode", uppercaseValue);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xs mx-auto space-y-2"
      >
        <FormField
          control={form.control}
          name="sessionCode"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center space-x-2">
                <FormControl>
                  <Input
                    placeholder="CVCVC"
                    {...field}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <Button
                  className="bg-green-500 hover:bg-green-500/90"
                  type="submit"
                >
                  Join
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default JoinSessionForm;
