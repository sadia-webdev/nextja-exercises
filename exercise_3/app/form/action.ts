"use server";

type FormState = {
  message: string;
  error: string;
};

export const handleFormSubmit = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;



  if(!email) {
    return { message: "", error: "Email is required." };
  }

  console.log(email)

  if (!password || password.length < 6) {
    return { message: "", error: "Password must be at least 6 characters." };
  }

  if (!firstName || !lastName) {
    return { message: "", error: "First and last names are required." };
  }

  return { 
    message: `Hello, ${firstName} ${lastName}! Thanks for submitting!`, 
    error: "" 
  };
};