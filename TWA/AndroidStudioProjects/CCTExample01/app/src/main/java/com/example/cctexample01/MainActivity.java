package com.example.cctexample01;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.browser.customtabs.CustomTabsServiceConnection;
import androidx.browser.customtabs.CustomTabsSession;
import androidx.core.app.ActivityOptionsCompat;
import androidx.core.content.ContextCompat;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    private final String url = "http://www.google.com";
    @Nullable
    private CustomTabsSession mSession;
    private CustomTabsServiceConnection mConnection;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        findViewById(R.id.button1).setOnClickListener(this::launchUrl);
        findViewById(R.id.button2).setOnClickListener(this::launchCCT);
    }

    public void launchUrl(View view) {
        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.google.com"));
        browserIntent.putExtra(CustomTabsIntent.EXTRA_SESSION, Bundle.EMPTY);
        browserIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        //startActivity(browserIntent);
        ContextCompat.startActivity(this, browserIntent, ActivityOptionsCompat.makeCustomAnimation(this, R.anim.slide_in_left, 0).toBundle());
    }
    public void launchCCT(View view) {
        CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
        builder.setStartAnimations(this, R.anim.slide_in_left, 0);
        CustomTabsIntent customTabsIntent = builder.build();
        customTabsIntent.launchUrl(this, Uri.parse(url));

    }
}