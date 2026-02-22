import { useLanguage } from "@/lib/LanguageContext";

export default function Privacy() {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black tracking-tight">{t('privacyTitle')}</h1>
                <p className="text-muted-foreground">{t('lastUpdated')}: February 21, 2026</p>
            </div>

            <div className="glass p-12 rounded-[2.5rem] border-primary/5 space-y-8 leading-relaxed">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-600">{t('infoCollectTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('infoCollectText')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-600">{t('howUseTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('howUseText')}
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                        <li>{t('howUseItem1')}</li>
                        <li>{t('howUseItem2')}</li>
                        <li>{t('howUseItem3')}</li>
                        <li>{t('howUseItem4')}</li>
                        <li>{t('howUseItem5')}</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-600">{t('dataSecurityTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('dataSecurityText')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-600">{t('sharingInfoTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('sharingInfoText')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-600">{t('contactUs')}</h2>
                    <p className="text-muted-foreground">
                        {t('privacyContactText')} privacy@techspark.ai.
                    </p>
                </section>
            </div>
        </div>
    );
}
