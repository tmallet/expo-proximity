import ExpoModulesCore

let proximityStateDidChange: String = "Expo.proximityStateDidChange"

public class ExpoProximityModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoProximity")
        
        Constants([
            "isSupported": isSupported()
        ])
        
        Events(proximityStateDidChange)
        
        AsyncFunction("getProximityStateAsync") { () -> Bool in
            return UIDevice.current.proximityState
        }
        
        OnCreate {
            UIDevice.current.isProximityMonitoringEnabled = true
        }
        
        OnDestroy {
            UIDevice.current.isProximityMonitoringEnabled = false
        }
        
        OnStartObserving {
            NotificationCenter.default.addObserver(self, selector: #selector(self.proximityStateListener), name: UIDevice.proximityStateDidChangeNotification, object: nil)
        }
        
        OnStopObserving {
            NotificationCenter.default.removeObserver(self, name: UIDevice.proximityStateDidChangeNotification, object: nil)
        }
    }
    
    @objc
    func proximityStateListener() {
        sendEvent(proximityStateDidChange, [
            "proximityState": UIDevice.current.proximityState
        ])
    }
}

func isSupported() -> Bool {
#if targetEnvironment(simulator)
    return false
#else
    return true
#endif
}
