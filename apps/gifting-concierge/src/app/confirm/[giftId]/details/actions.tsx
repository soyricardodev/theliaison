"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/supabase/server";

export async function confirmGiftFromRecipient(formData: FormData) {
  const supabase = createClient();

  const giftId = formData.get("gift_id") as string;
  const recipientEmail = formData.get("recipient_email") as string;
  const recipientFirstName = formData.get("recipient_first_name") as string;
  const recipientLastName = formData.get("recipient_last_name") as string;
  const recipientPhone = formData.get("recipient_phone") as string;
  const recipientCountry = formData.get("recipient_country") as string;
  const recipientAddress = formData.get("recipient_address") as string;
  const recipientApartment = formData.get("recipient_apartment") as string;
  const recipientCity = formData.get("recipient_city") as string;
  const recipientPostalCode = formData.get("recipient_pc") as string;

  const { error } = await supabase
    .from("gifts")
    .update({
      recipient_email: recipientEmail,
      recipient_name: `${recipientFirstName} ${recipientLastName}`,
      recipient_phone: recipientPhone,
      recipient_country: recipientCountry,
      recipient_address: recipientAddress,
      recipient_appartment: recipientApartment,
      recipient_city: recipientCity,
      recipient_pc: Number(recipientPostalCode),
      is_confirmed: true,
    })
    .eq("id", giftId);

  console.log(error);

  redirect("/details/thanks");
}
