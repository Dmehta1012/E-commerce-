import { createFileRoute } from "@tanstack/react-router";
import { Product } from "../components/product";

export const Route=createFileRoute("/")({
    component:Product,
})
