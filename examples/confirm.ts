import { confirm } from "../io/confirm.ts";

const a1 = await confirm("OK?");
console.log(a1);

const a2 = await confirm("Good?", { default: false });
console.log(a2);
