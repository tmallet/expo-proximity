import ExpoModulesCore

let proximityStateDidChange: String = "onProximityStateChange"
let proximitySensorActivationDidChange: String = "onProximitySensorActivationChange"

public class ExpoProximityModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoProximity")
        
        Constants([
            "isSupported": isSupported()
        ])
        
        Events(proximityStateDidChange)
        Events(proximitySensorActivationDidChange)
        
        Function("getProximityState") { () -> Bool in
            return UIDevice.current.proximityState
        }
        
        Function("isActivated") { () -> Bool in
            return DispatchQueue.main.sync {
                return UIDevice.current.isProximityMonitoringEnabled
            }
        }
        
        AsyncFunction("deactivate") { () -> Void in
            if(isSupported()){
                return DispatchQueue.main.async {
                    NotificationCenter.default.removeObserver(self, name: UIDevice.proximityStateDidChangeNotification, object: nil)
                    UIDevice.current.isProximityMonitoringEnabled = false
                    self.sendEvent(proximitySensorActivationDidChange, [
                        "isActivated": false
                    ])
                }
            }
        }
        
        AsyncFunction("activate") { () -> Void in
            if(isSupported()){
                return DispatchQueue.main.async {
                    NotificationCenter.default.addObserver(self, selector: #selector(self.proximityStateListener), name: UIDevice.proximityStateDidChangeNotification, object: nil)
                    UIDevice.current.isProximityMonitoringEnabled = true
                    self.sendEvent(proximitySensorActivationDidChange, [
                        "isActivated": true
                    ])
                }
            }
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
