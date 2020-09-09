package com.eirage.pwa.twa;


    import com.google.androidbrowserhelper.locationdelegation.LocationDelegationExtraCommandHandler;


public class DelegationService extends
        com.google.androidbrowserhelper.trusted.DelegationService {
    public DelegationService() {
        
            registerExtraCommandHandler(new LocationDelegationExtraCommandHandler());
        
    }
}

