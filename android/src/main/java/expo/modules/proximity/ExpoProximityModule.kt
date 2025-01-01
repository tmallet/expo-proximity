package expo.modules.proximity

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

internal const val PROXIMITY_STATE_EVENT_NAME = "onProximityStateChange"
internal const val PROXIMITY_SENSOR_ACTIVATION_EVENT_NAME = "onProximitySensorActivationChange"

class ExpoProximityModule : Module(), SensorEventListener {

    private var lastFarTime: Double = 0.0
    private var lastReading: Double = 0.0
    private var lastCloseTime: Double = 0.0
    private var isClose: Boolean = false
    private var hasListener: Boolean = false
    private var isActivated: Boolean = false

    override fun definition() = ModuleDefinition {
        Name("ExpoProximity")

        Events(PROXIMITY_STATE_EVENT_NAME, PROXIMITY_SENSOR_ACTIVATION_EVENT_NAME)

        Function<Boolean>("getProximityState") {
            isClose
        }

        Function<Boolean>("isActivated") {
            isActivated
        }

        AsyncFunction("deactivate") {
            deactivate()
        }

        AsyncFunction("activate") {
            activate()
        }

        AsyncFunction("setValueAsync") { value: String ->
            sendEvent("onChange", mapOf("value" to value))
        }

        AsyncFunction<Boolean>("isAvailableAsync") {
            isAvailable()
        }

        OnStartObserving {
            activate()
        }

        OnStopObserving {
            deactivate()
        }

        Function("setHasListener") { value: Boolean ->
            hasListener = value
        }
    }

    private fun isAvailable(): Boolean {
        val sensorManager =
            appContext.reactContext?.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
        return sensorManager?.getDefaultSensor(Sensor.TYPE_PROXIMITY) != null
    }

    private fun deactivate() {
        if (isAvailable()) {
            val sensorManager =
                appContext.reactContext?.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
            val sensor = sensorManager?.getDefaultSensor(Sensor.TYPE_PROXIMITY)
            sensorManager?.unregisterListener(this@ExpoProximityModule, sensor)
            isActivated = false
            sendEvent(PROXIMITY_SENSOR_ACTIVATION_EVENT_NAME, mapOf("isActivated" to false))
        }
    }

    private fun activate() {
        if (isAvailable()) {
            val sensorManager =
                appContext.reactContext?.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
            val sensor = sensorManager?.getDefaultSensor(Sensor.TYPE_PROXIMITY)
            sensorManager?.registerListener(
                this@ExpoProximityModule, sensor, SensorManager.SENSOR_DELAY_NORMAL
            )
            isActivated = true
            sendEvent(PROXIMITY_SENSOR_ACTIVATION_EVENT_NAME, mapOf("isActivated" to true))
        }
    }

    override fun onSensorChanged(sensorEvent: SensorEvent?) {
        if (!hasListener) {
            return
        }
        val tempMs = System.currentTimeMillis().toDouble()
        if (tempMs - lastReading >= SensorManager.SENSOR_DELAY_NORMAL) {
            lastReading = tempMs
            val distance: Float? = sensorEvent?.values?.get(0)
            if (distance != null && distance <= 3) {
                if (tempMs - lastCloseTime >= 500) {
                    if (!isClose) {
                        isClose = true
                    }
                    lastCloseTime = tempMs
                }
            } else {
                if (tempMs - lastFarTime >= 500) {
                    if (isClose) {
                        isClose = false
                    }
                    lastFarTime = tempMs
                }
            }
            sendEvent(PROXIMITY_STATE_EVENT_NAME, mapOf("proximityState" to isClose))
        }

    }

    override fun onAccuracyChanged(p0: Sensor?, p1: Int) {

    }
}
