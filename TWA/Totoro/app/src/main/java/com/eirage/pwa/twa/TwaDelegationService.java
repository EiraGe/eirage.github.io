package com.eirage.pwa.twa;

import com.google.androidbrowserhelper.locationdelegation.LocationDelegationExtraCommandHandler;
import com.google.androidbrowserhelper.trusted.DelegationService;

public class TwaDelegationService extends DelegationService {
    public TwaDelegationService() {
        registerExtraCommandHandler(new LocationDelegationExtraCommandHandler());
    }
}

