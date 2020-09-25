# builds srl295/icu-demo:ubuntu
FROM srl295/icu-build:ubuntu
LABEL maintainer="Steven R. Loomis <srl295@gmail.com>"
# add a couple things
USER root
RUN apt install -qq -y pkg-config emacs-nox
# back to you.
USER build
