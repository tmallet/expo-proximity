package expo.modules.proximity

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

internal const val PROXIMITY_STATE_EVENT_NAME = "onProximityStateChange"

class ExpoProximityModule : Module(), SensorEventListener {

    private var lastFarTime: Double = 0.0
    private var lastReading: Double = 0.0
    private var lastCloseTime: Double = 0.0
    private var isClose: Boolean = false
    private var hasListener: Boolean = false

    override fun definition() = ModuleDefinition {
        Name("ExpoProximity")

        Events(PROXIMITY_STATE_EVENT_NAME)

        AsyncFunction("setValueAsync") { value: String ->
            sendEvent("onChange", mapOf("value" to value))
        }

        AsyncFunction<Boolean>("isAvailableAsync") {
            val sensorManager = appContext.reactContext?.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
            sensorManager?.getDefaultSensor(Sensor.TYPE_PROXIMITY) != null
        }

        OnStartObserving {
            val sensorManager = appContext.reactContext?.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
            val sensor = sensorManager?.getDefaultSensor(Sensor.TYPE_PROXIMITY)
            sensorManager?.registerListener(this@ExpoProximityModule, sensor, SensorManager.SENSOR_DELAY_NORMAL)
        }

        OnStopObserving {
            val sensorManager = appContext.reactContext?.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
            val sensor = sensorManager?.getDefaultSensor(Sensor.TYPE_PROXIMITY)
            sensorManager?.unregisterListener(this@ExpoProximityModule, sensor)
        }

        Function("setHasListener") { value: Boolean ->
            hasListener = value
        }

        AsyncFunction<Boolean>("getProximityStateAsync") {
            isClose
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
