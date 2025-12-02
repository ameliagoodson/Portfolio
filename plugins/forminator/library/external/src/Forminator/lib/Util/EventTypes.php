<?php

namespace Forminator\Stripe\Util;

class EventTypes
{
    const thinEventMapping = [
        // The beginning of the section generated from our OpenAPI spec
        \Forminator\Stripe\Events\V1BillingMeterErrorReportTriggeredEvent::LOOKUP_TYPE => \Forminator\Stripe\Events\V1BillingMeterErrorReportTriggeredEvent::class,
        \Forminator\Stripe\Events\V1BillingMeterNoMeterFoundEvent::LOOKUP_TYPE => \Forminator\Stripe\Events\V1BillingMeterNoMeterFoundEvent::class,
        \Forminator\Stripe\Events\V2CoreEventDestinationPingEvent::LOOKUP_TYPE => \Forminator\Stripe\Events\V2CoreEventDestinationPingEvent::class,
    ];
}
