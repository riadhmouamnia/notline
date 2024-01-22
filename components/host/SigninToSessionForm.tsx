import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  secret: z
    .string()
    .min(5, {
      message: "Secret is required",
    })
    .length(5, {
      message: "Secret must be 5 characters in the fromat CVCVC.",
    }),
  pin: z.string().min(1, {
    message: "Pin is required",
  }),
});

function SigninToSessionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secret: "",
      pin: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host another session</FormLabel>
              <FormControl>
                <Input placeholder="CVCVC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center space-x-2">
                <FormControl>
                  <Input placeholder="PIN" {...field} />
                </FormControl>
                <Button
                  className="bg-orange-500 hover:bg-orange-500/90"
                  type="submit"
                >
                  Submit
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

export default SigninToSessionForm;
