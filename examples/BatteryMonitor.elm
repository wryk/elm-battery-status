module BatteryMonitor where

import BatteryStatus
import Graphics.Element exposing (Element, show)

main : Signal Element
main =
    Signal.map show BatteryStatus.charging
