import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../components/handposeutil";
import * as fp from "fingerpose";
import Handsigns from "../components/handsigns";
import './SignLanguageDetection.css';

import {
  Text,
  Heading,
  Button,
  Stack,
  Container,
  Box,
  VStack,
  ChakraProvider,
} from "@chakra-ui/react";
import About from "../components/about";
import Metatags from "../components/metatags";
import { RiCameraFill, RiCameraOffFill } from "react-icons/ri";

export default function Homes() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [camState, setCamState] = useState("on");
  const [sign, setSign] = useState(null);

  let signList = [];
  let currentSign = 0;
  let gamestate = "started";

  async function runHandpose() {
    const net = await handpose.load();
    _signList();

    //Use setInterval to detect gestures every 150ms
    setInterval(() => {
      detect(net);
    }, 150);
  }

  function _signList() {
    signList = generateSigns();
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function generateSigns() {
    const password = shuffle(["thumbs_up", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    return password;
  }

  async function detect(net) {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.ThumbsUpGesture,
          Handsigns.aSign,
          Handsigns.bSign,
          Handsigns.cSign,
          Handsigns.dSign,
          Handsigns.eSign,
          Handsigns.fSign,
          Handsigns.gSign,
          Handsigns.hSign,
          Handsigns.iSign,
          Handsigns.jSign,
          Handsigns.kSign,
          Handsigns.lSign,
          Handsigns.mSign,
          Handsigns.nSign,
          Handsigns.oSign,
          Handsigns.pSign,
          Handsigns.qSign,
          Handsigns.rSign,
          Handsigns.sSign,
          Handsigns.tSign,
          Handsigns.uSign,
          Handsigns.vSign,
          Handsigns.wSign,
          Handsigns.xSign,
          Handsigns.ySign,
          Handsigns.zSign,
        ]);

        const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5);

        if (estimatedGestures.gestures && estimatedGestures.gestures.length > 0) {
          const confidence = estimatedGestures.gestures.map(p => p.confidence);
          const maxConfidence = confidence.indexOf(
            Math.max.apply(undefined, confidence)
          );

          if (gamestate === "started") {
            document.querySelector("#app-title").innerText =
              "Make a 👍 gesture with your hand to start";
          }

          if (
            estimatedGestures.gestures[maxConfidence] &&
            estimatedGestures.gestures[maxConfidence].confidence > 0.5
          ) {
            const gestureName = estimatedGestures.gestures[maxConfidence].name;

            setSign(gestureName); // Update detected sign

            // Game state handling
            if (gestureName === "thumbs_up" && gamestate !== "played") {
              _signList();
              gamestate = "played";
              document.querySelector("#app-title").innerText = "";
            } else if (gamestate === "played") {
              if (currentSign === signList.length) {
                _signList();
                currentSign = 0;
                return;
              }

              if (signList[currentSign] === gestureName) {
                currentSign++;
              }
            }
          }
        }
      }
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }

  useEffect(() => {
    runHandpose();
  }, []);

  useEffect(() => {
    console.log("Detected sign updated:", sign);
  }, [sign]);

  function turnOffCamera() {
    setCamState(prevState => (prevState === "on" ? "off" : "on"));
  }

  return (
    <ChakraProvider>
      <Metatags />
      <Box bgColor="#5784BA">
        <Container centerContent maxW="xl" height="100vh" pt="0" pb="0">
          <VStack spacing={4} align="center">
            <Box h="20px"></Box>
            <Heading
              as="h3"
              size="md"
              className="tutor-text"
              color="white"
              textAlign="center"
            ></Heading>
            <Box h="20px"></Box>
          </VStack>

          <Heading
            as="h1"
            size="lg"
            id="app-title"
            color="white"
            textAlign="center"
          >
            🧙‍♀️ Loading the Magic 🧙‍♂️
          </Heading>

          <Box id="webcam-container">
            {camState === "on" ? (
              <Webcam id="webcam" ref={webcamRef} />
            ) : (
              <div id="webcam" background="black"></div>
            )}

{sign && (
    <div
        style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            right: "calc(50% - 50px)",
            bottom: 100,
            textAlign: "-webkit-center",
        }}
    >
        <Text fontSize="xl" fontWeight="bold" color="white" mb={0} lineHeight="1.2">
            Detected Gesture
        </Text>
        <Text fontSize="5xl" fontWeight="bold" color="yellow" alignItems="center" mt={0}>
            {sign.toUpperCase()}
        </Text>
    </div>
)}

          </Box>
          <canvas id="gesture-canvas" ref={canvasRef} style={{}} />
          <Stack id="start-button" spacing={4} direction="row" align="center">
            <Button
              leftIcon={
                camState === "on" ? (
                  <RiCameraFill size={20} />
                ) : (
                  <RiCameraOffFill size={20} />
                )
              }
              onClick={turnOffCamera}
              colorScheme="orange"
            >
              Camera
            </Button>
            <About />
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

