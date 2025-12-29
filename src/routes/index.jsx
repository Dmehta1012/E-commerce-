import { createFileRoute } from "@tanstack/react-router";
import { product } from "../components/product";

export const Route=createFileRoute("/")({
    component:product,
})
