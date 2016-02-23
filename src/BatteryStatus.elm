module BatteryStatus where

{-| Elm bindings to HTML5 Battery Status API

@docs level, charging, chargingTime, dischargingTime

-}

import Maybe exposing (Maybe)
import Native.BatteryStatus

{-| Signal of the current battery charge level.
From 0 when discharged to 1 when fully charged.
-}
level : Signal (Maybe Float)
level =
    Native.BatteryStatus.level

{-| Signal that is True when the battery is charging. -}
charging : Signal (Maybe Bool)
charging =
    Native.BatteryStatus.charging

{-| Signal of the remaining time in seconds before the battery is charged. -}
chargingTime : Signal (Maybe Int)
chargingTime =
    Native.BatteryStatus.chargingTime

{-| Signal of the remaining time in seconds before the battery is discharged. -}
dischargingTime : Signal (Maybe Int)
dischargingTime =
    Native.BatteryStatus.dischargingTime
