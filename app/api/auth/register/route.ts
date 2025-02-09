// app/auth/register/route.ts
import { z } from "zod";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb"; // Your MongoDB connection helper
import bcrypt from "bcrypt";
import User from "@/models/User";
import { error } from "console";

// Zod validation schema
const registrationSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Full name is required" })
      .regex(/^[A-Za-z\s]+$/, {
        message: "Full name must contain only letters",
      })
      .max(25, { message: "Full name must be at most 25 characters" }),
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters" })
      .max(15, { message: "Username must be at most 15 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Attach the error to the confirmPassword field
  });

// Server action to handle registration
export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectDB();

    const { fullName, username, password, confirmPassword } = await req.json();

    // Zod validation
    const parsed = registrationSchema.safeParse({
      fullName,
      username,
      password,
      confirmPassword,
    });

    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        error: parsed.error.flatten().fieldErrors,
      });
    }

    // Check if the username already exists
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json({
        success: false,
        error: {
          global: ["Username already exists"],
        },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user and save to DB
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: {
        global: "Something went wrong. Please try again later.",
      },
    });
  }
}
