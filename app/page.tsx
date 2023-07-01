"use client";

import Image from "next/image";
import FighterImage from "../resources/images/fighter.jpg";
import HouseImage from "../resources/images/house.png";
import SpaceImage from "../resources/images/space.png";
import TreesImage from "../resources/images/trees.jpg";
import UmbrellaImage from "../resources/images/umbrella.jpg";

import Wheel from "@/components/Wheel";
import { ScrollLinked, ScrollTriggered } from "@/components/types";

export default function Home() {
  return (
    <main>
      <div className="w-screen h-[300vh] bg-blue-800"></div>
      <Wheel slidesCount={5}>
        <Wheel.CoverSlides scrollAnimation={new ScrollLinked(true)} className="" width="50vw" height="50vh">
          <Image
            src={FighterImage}
            alt="fighter"
            className="min-w-[50vw] min-h-[50vh] object-cover"
          />
          <Image
            src={HouseImage}
            alt="house"
            className="min-w-[50vw] min-h-[50vh] object-cover"
          />
          <Image
            src={SpaceImage}
            alt="space"
            className="min-w-[50vw] min-h-[50vh] object-cover"
          />
          <Image
            src={TreesImage}
            alt="trees"
            className="min-w-[50vw] min-h-[50vh] object-cover"
          />
          <Image
            src={UmbrellaImage}
            alt="umbrella"
            className="min-w-[50vw] min-h-[50vh] object-cover"
          />
        </Wheel.CoverSlides>
      </Wheel>
      <div className="w-screen h-[300vh] bg-blue-800"></div>
    </main>
  );
}
