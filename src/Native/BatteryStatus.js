Elm.Native = Elm.Native || {};
Elm.Native.BatteryStatus = {};

Elm.Native.BatteryStatus.make = function(localRuntime) {
    localRuntime.Native = localRuntime.Native || {};
    localRuntime.Native.BatteryStatus = localRuntime.Native.BatteryStatus || {};

    if (localRuntime.Native.BatteryStatus.values) {
        return localRuntime.Native.BatteryStatus.values;
    }

    var NativeSignal = Elm.Native.Signal.make(localRuntime);
    var Maybe = Elm.Maybe.make(localRuntime);

    // level : Signal (Maybe Float)
    var level = NativeSignal.input('BatteryStatus.level', Maybe.Nothing);

    // charging : Signal (Maybe Bool)
    var charging = NativeSignal.input('BatteryStatus.charging', Maybe.Nothing);

    // chargingTime : Signal (Maybe Int)
    var chargingTime = NativeSignal.input('BatteryStatus.chargingTime', Maybe.Nothing);

    // dischargingTime : Signal (Maybe Int)
    var dischargingTime = NativeSignal.input('BatteryStatus.dischargingTime', Maybe.Nothing);

    navigator.getBattery().then(function (battery) {
        localRuntime.addListener([level.id], battery, 'levelchange', notifyLevel);
        localRuntime.addListener([charging.id], battery, 'chargingchange', notifyCharging);
        localRuntime.addListener([chargingTime.id], battery, 'chargingtimechange', notifyChargingTime);
        localRuntime.addListener([dischargingTime.id], battery, 'dischargingtimechange', notifyDischargingTime);

        notifyLevel();
        notifyCharging();
        notifyChargingTime();
        notifyDischargingTime();

        function notifyLevel() {
            localRuntime.notify(level.id, Maybe.Just(battery.level));
        }

        function notifyCharging() {
            localRuntime.notify(charging.id, Maybe.Just(battery.charging));
        }

        function notifyChargingTime() {
            localRuntime.notify(chargingTime.id, Maybe.Just(battery.chargingTime));
        }

        function notifyDischargingTime() {
            localRuntime.notify(dischargingTime.id, Maybe.Just(battery.dischargingTime));
        }
    });

    return {
        level: level,
        charging: charging,
        chargingTime: chargingTime,
        dischargingTime: dischargingTime
    };
};
