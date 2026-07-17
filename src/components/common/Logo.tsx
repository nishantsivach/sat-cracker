// components/Logo.tsx
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <svg
        width="180"
        height="70"
        viewBox="0 0 900 550"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        {/* Outer Crescent */}
        <path
          fill="#1B2A4A"
          d="M490 62
          C380 50 210 105 145 230
          C90 335 115 445 220 505
          C320 560 440 510 505 455
          C410 475 270 455 205 375
          C145 300 165 190 260 125
          C325 80 420 68 490 62Z"
        />


        {/* Top Gold Crescent */}
        <path
          fill="#C89B3C"
          d="M270 165
          C340 110 450 105 565 168
          C465 138 360 140 300 195
          C285 210 278 225 278 225
          C278 225 258 180 270 165Z"
        />


        {/* Bottom Gold Crescent */}
        <path
          fill="#C89B3C"
          d="M270 415
          C340 470 450 475 565 412
          C465 442 360 440 300 385
          C285 370 278 355 278 355
          C278 355 258 400 270 415Z"
        />


        {/* S */}
        <path
          fill="#2E5EAA"
          d="M240 325
          L292 270
          C315 248 340 240 380 240
          L425 240
          L438 202
          L278 202
          L290 165
          L490 165
          L462 250
          C435 275 410 285 370 285
          L325 285
          L303 353
          L472 353
          L458 392
          L245 392
          Z"
        />


        {/* A */}
        <path
          fill="#1B2A4A"
          d="M435 392
          L512 165
          L590 165
          L655 392
          L578 392
          L567 348
          L495 348
          L480 392
          Z

          M508 308
          L555 308
          L540 253
          Z"
        />


        {/* T */}
        <path
          fill="#1B2A4A"
          d="M635 215
          L652 165
          L818 165
          L790 215
          L745 215
          L685 392
          L610 392
          L670 215
          Z"
        />

      </svg>
    </Link>
  );
}