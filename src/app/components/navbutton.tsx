import { Button } from "@mui/material";
import Link from "next/link";

type NProp = {
  name: String;
  href: string;
};

export default function NavButton(props: NProp) {
  return (
    <>
      <Link href={props.href}>
        <Button variant="contained">{props.name}</Button>
      </Link>
    </>
  );
}

{
  /* <NavButton href="/women/shoes" name="Shoes"></NavButton> */
}
